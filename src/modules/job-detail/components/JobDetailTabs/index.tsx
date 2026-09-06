import { JOB_DETAIL_TABS, JobDetailTab } from "../../job-detail.constants";

import { SegmentedControl } from "~/src/shared/components/ui/SegmentedControl";

type Props = {
  value: JobDetailTab;
  onChange: (tab: JobDetailTab) => void;
};

export function JobDetailTabs({ value, onChange }: Props) {
  return <SegmentedControl items={JOB_DETAIL_TABS} value={value} onChange={onChange} />;
}
