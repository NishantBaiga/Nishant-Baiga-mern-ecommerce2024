import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ComponentForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled
}) => {
  // Function to render different input components based on the "componentType"
  function renderInputsByComponentType(getControlItem) {
    let element = null; // Initialize element variable to hold the JSX component
    const value = formData[getControlItem.name] || ""; // Get the current value for the form control from formData

    // Switch case to render different form elements based on componentType
    switch (getControlItem.componentType) {
      case "input":
        // Renders an Input component
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            // Handle input change and update formData
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        // Renders a Select dropdown component
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        // Renders a Textarea component
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            // Handle textarea change and update formData
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        // Default case to render an Input if no other componentType is matched
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element; // Return the form element to be rendered
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
      
        {/* Form submission handler */}
        <div className="flex flex-col gap-3">
          {/* Map over formControls to dynamically render form elements */}
          {formControls.map((controlItem) => {
            return (
              <div className="grid w-full gap-1.5" key={controlItem.name}>
                <Label className="mb-1">{controlItem.label}</Label>
                {/* Render inputs based on component type */}
                {renderInputsByComponentType(controlItem)}
              </div>
            );
          })}
        </div>
        
        {/* Submit button */}
        <Button disable={isBtnDisabled} variant="outline"  type="submit" className="mt-2 w-full">
          {buttonText || "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ComponentForm;
