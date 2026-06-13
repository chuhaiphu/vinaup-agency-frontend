import { DynamicSectionUIResponse } from '@/interfaces/dynamic-section-ui-interfaces';

export interface SectionUIEditFormValues {
  position: number;
  sectionUICredentialsId: string | null;
  // Buffered as a JSON string so the JSONEditor can edit it freely; parsed on Save.
  propertiesJson: string;
}

export function toSectionUIEditFormValues(item: DynamicSectionUIResponse): SectionUIEditFormValues {
  return {
    position: item.position,
    sectionUICredentialsId: item.sectionUICredentialsId,
    propertiesJson: item.properties ? JSON.stringify(item.properties, null, 2) : '',
  };
}
