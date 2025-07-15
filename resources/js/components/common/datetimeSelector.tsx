import {DateTimePicker, DateTimeValidationError, LocalizationProvider, PickerChangeHandlerContext, TimeView} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateOrTimeViewWithMeridiem, PickerValue } from '@mui/x-date-pickers/internals';
import { DateTimePickerViewRenderers } from 'node_modules/@mui/x-date-pickers/esm/DateTimePicker/shared';

type pickerProps = {
    label: string,
    onChange: ([key]:string) => any,
    defaultValue?: PickerValue,
    name?: string,
    disabled?: boolean,
    viewRenderers?: Partial<DateTimePickerViewRenderers<DateOrTimeViewWithMeridiem>>
}
const DateTimeSelector = (props:pickerProps) => {
    const timeChange = (value: PickerValue, context: PickerChangeHandlerContext<DateTimeValidationError>) => {
        props.onChange(value!.format('YYYY-MM-DD HH:mm:ss'));
    }
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
                label={props.label}
                onChange={timeChange}
                defaultValue={props.defaultValue}
                name={props.name}
                disabled={props.disabled}
                viewRenderers={props.viewRenderers}
            />

        </LocalizationProvider>
    )
}
export default DateTimeSelector;