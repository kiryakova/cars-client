import {
    FormDropdownContainer,
    FormDropdownContainerInSearchMenu,
    FormDropdownField,
	FormDropdownOption,
    FormDropdownLabel
} from './styled.module.js';

const FormDropdown = ({ handleChange, label, options, canBeEmpty, selectedValueId, fieldInSearchMenu, ...props }) => {

    return (
        <>
        {(fieldInSearchMenu) 
        ? <FormDropdownContainerInSearchMenu>
        {label ? (
            <FormDropdownLabel>
                {label}
            </FormDropdownLabel>
        ) : null}

        <FormDropdownField onChange={(e) => handleChange(e.target.value)} {...props} > 
            {canBeEmpty ? <FormDropdownOption key="" value="" /> : ''}
            
            {options.map(x => 
                (selectedValueId == x.id) 
                    ? <FormDropdownOption key={x.id} value={x.id} selected>
                    {(label == 'Owner') ? 'EGN: ' + x.egn +' Name: '+ x.firstName+' '+ x.lastName : x.name}
                    </FormDropdownOption> 
                    :  <FormDropdownOption key={x.id} value={x.id}>
                    {(label == 'Owner') ? 'EGN: ' + x.egn +' Name: '+ x.firstName+' '+ x.lastName : x.name}
                    </FormDropdownOption>
            
            )
            }   
            </FormDropdownField>
        </FormDropdownContainerInSearchMenu>
    
        :

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
                    :  <FormDropdownOption key={x.id} value={x}>
                    {x}
                    </FormDropdownOption>
                )
                :
                options.map(x => 
                    (selectedValueId == x.id) 
                        ? <FormDropdownOption key={x.id} value={x.id} selected>
                        {(label == 'Owner') ? 'EGN: ' + x.egn +' Name: '+ x.firstName+' '+ x.lastName : x.name}
                        </FormDropdownOption> 
                        :  <FormDropdownOption key={x.id} value={x.id}>
                        {(label == 'Owner') ? 'EGN: ' + x.egn +' Name: '+ x.firstName+' '+ x.lastName : x.name}
                        </FormDropdownOption>
                
                )
            }   
				</FormDropdownField>
			)
            : <FormDropdownField {...props} > 
				{options.map(x => 
                            <FormDropdownOption key={x.id} value={x.id}>{x.name}</FormDropdownOption>    
                        )}
				</FormDropdownField>
			}
        </FormDropdownContainer>
        }
        </>
    );
}

export default FormDropdown;