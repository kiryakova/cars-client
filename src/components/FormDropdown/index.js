import { useEffect } from 'react';
import {
    FormDropdownContainer,
    FormDropdownField,
	FormDropdownOption,
    FormDropdownLabel
} from './styled.module.js';

const FormDropdown = ({ handleChange, label, options, canBeEmpty, selectedValueId, ...props }) => {

    return (
        <FormDropdownContainer>
            {label ? (
                <FormDropdownLabel>
                    {label}
                </FormDropdownLabel>
            ) : null}

            {handleChange ? (<FormDropdownField onChange={(e) => handleChange(e.target.value)} {...props} > 
                {canBeEmpty ? <FormDropdownOption key="" value="" /> : ''}
				
                {(label == "Engine Type") 
                ? 
                options.map(x => 
                    (selectedValueId == x) 
                    ? <FormDropdownOption key={x} value={x} selected>
                    {x}
                    </FormDropdownOption> 
                    :  <FormDropdownOption key={x.id} value={x.id}>
                    {x}
                    </FormDropdownOption>
                )
                :
                options.map(x => 
                    (selectedValueId == x.id) 
                        ? <FormDropdownOption key={x.id} value={x.id} selected>
                        {(label == 'Owner') ? x.egn : x.name}
                        </FormDropdownOption> 
                        :  <FormDropdownOption key={x.id} value={x.id}>
                        {(label == 'Owner') ? x.egn : x.name}
                        </FormDropdownOption>
                
                )
            }
                
				</FormDropdownField>
			)
            : <FormDropdownField {...props} > 
				{options.map(x => 
                            <FormDropdownOption key={x.id} value={x.value}>{x.text}</FormDropdownOption>    
                        )}
				</FormDropdownField>
			}
        </FormDropdownContainer>
    );
}
export default FormDropdown;

/*
{(props.selectedValueId==x.id) ? <FormDropdownOption key={x.id} value={x.id} selected>{x.name}</FormDropdownOption> 
                        : <FormDropdownOption key={x.id} value={x.id}>{x.name}</FormDropdownOption>}
                                
                        )}
*/

/*
{options.map(x => 
                    {(selectedValueId == x.id) ? <FormDropdownOption key={x.id} value={x.id} selected>{x.name}</FormDropdownOption> 
                        :  <FormDropdownOption key={x.id} value={x.id}>{x.name}</FormDropdownOption>
                    }
                )}  
*/