import * as React from 'react';
import { updateWeeklyReportStatus } from '../services/api';

function HomeTableCustomToggle({ row, cell }): JSX.Element {
  const { value: initialCheckedValue } = cell;
  const { id: campaignId } = row.original;

  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    setIsChecked(initialCheckedValue);
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const { checked } = event.target;
    setIsChecked(checked);
    // TODO: dispatch global spinner start.
    try {
      const response = await updateWeeklyReportStatus(campaignId, checked);
      if (!response.ok) { throw new Error(response.statusText); }
    } catch (error) {
      console.error(error.message);
      // TODO: display some error message here.
      setIsChecked(!checked);
    }
    // TODO: dispatch global spinner stop.
  };
  return (
    <div className="d-flex justify-content-center">
      <label className="custom-toggle mb-0">
        <input type="checkbox" onChange={handleChange} checked={isChecked} />
        <span className="custom-toggle-slider rounded-circle" />
      </label>
    </div>
  );
}

export default HomeTableCustomToggle;
