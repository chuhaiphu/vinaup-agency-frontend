import { OverlayCard } from '@vinaup/ui/landing';

import { DiaryResponse } from '@/interfaces/diary-interfaces';

interface DiaryItemProps {
  item: {
    id: string;
    title: string;
    mainImageUrl: string | null;
    description: string | null;
    endpoint: string;
    diaryCategoryDiaries: DiaryResponse['diaryCategoryDiaries'];
    createdAt: Date;
    createdBy: DiaryResponse['createdBy'];
  };
}

export default function DiaryItem({ item }: DiaryItemProps) {
  return (
    <OverlayCard title={item.title} src={item.mainImageUrl || '/images/image-placeholder.png'} />
  );
}
