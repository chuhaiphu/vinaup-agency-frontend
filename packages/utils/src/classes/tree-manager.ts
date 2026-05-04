interface TreeNode {
  id: string;
  parent?: { id: string } | null;
  children?: this[];
  sortOrder: number;
}

/**
 * Builds and traverses a tree structure from a flat list of nodes.
 *
 * @param T - Node type that extends TreeNode (must have id, parent, children, sortOrder)
 *
 * @example
 * const manager = new TreeManager(flatList)
 * const root = manager.getRoot()
 */
export class TreeManager<T extends TreeNode> {
  private root: T;
  private nodeMap = new Map<string, T>();

  constructor(flatList: T[]) {
    this.root = this.buildTree(flatList);
  }

  private buildTree(flatList: T[]): T {
    let root: T | undefined;

    for (const item of flatList) {
      this.nodeMap.set(item.id, { ...item, children: [] });
    }
    for (const item of flatList) {
      const node = this.nodeMap.get(item.id);
      if (!node) continue;
      if (item.parent?.id) {
        const parent = this.nodeMap.get(item.parent.id);
        if (parent) {
          parent?.children?.push(node);
          parent?.children?.sort((a, b) => a.sortOrder - b.sortOrder);
        }
      } else {
        root = node;
      }
    }

    if (!root) {
      throw new Error('Root node not found');
    }
    return root;
  }

  private traverse(node: T, action: (node: T) => void) {
    action(node);
    for (const child of node.children ?? []) {
      this.traverse(child, action);
    }
  }

  /**
   * Returns all nodes as a flat list via depth-first traversal.
   *
   * @param startNodeId - Optional node id to start traversal from; defaults to root
   * @returns Flat array of nodes in traversal order
   * @example manager.toFlatList() // [root, child1, grandchild1, child2]
   */
  toFlatList(startNodeId?: string): T[] {
    const startNode = startNodeId ? this.getNodeById(startNodeId) : this.root;
    if (!startNode) return [];
    const result: T[] = [];
    this.traverse(startNode, (node) => result.push(node));
    return result;
  }

  /**
   * Returns all nodes except the root as a flat list.
   *
   * @returns Flat array of non-root nodes in traversal order
   * @example manager.toFlatListWithoutRoot() // [child1, grandchild1, child2]
   */
  toFlatListWithoutRoot(): T[] {
    const result: T[] = [];
    for (const child of this.root.children ?? []) {
      this.traverse(child, (node) => result.push(node));
    }
    return result;
  }

  /**
   * Collects all descendant ids of the given nodes into a Set.
   *
   * @param nodes - Array of nodes to collect ids from (including their descendants)
   * @returns Set of string ids
   * @example manager.toIds([nodeA]) // Set { 'a', 'a-child-1', 'a-child-2' }
   */
  toIds(nodes: T[]): Set<string> {
    const result = new Set<string>();
    for (const node of nodes) {
      this.traverse(node, (node) => result.add(node.id));
    }
    return result;
  }

  /**
   * Returns the root node of the tree.
   *
   * @returns The root node
   * @example manager.getRoot() // { id: 'root', children: [...] }
   */
  getRoot(): T {
    return this.root;
  }

  /**
   * Finds a node by its id.
   *
   * @param id - The node's unique identifier
   * @returns The matching node, or null if not found
   * @example manager.getNodeById('abc') // T | null
   */
  getNodeById(id: string): T | null {
    return this.nodeMap.get(id) ?? null;
  }

  /**
   * Returns sibling nodes of the given node (same parent, excluding itself).
   *
   * @param id - The node's unique identifier
   * @returns Array of sibling nodes, empty if the node has no parent
   * @example manager.getSiblings('b') // [siblingC, siblingD]
   */
  getSiblings(id: string): T[] {
    const node = this.getNodeById(id);
    if (!node || !node.parent) return [];
    const parentNode = this.getNodeById(node.parent.id);
    if (!parentNode || !parentNode.children) return [];
    return parentNode.children.filter((child: T) => child.id !== id);
  }
}
