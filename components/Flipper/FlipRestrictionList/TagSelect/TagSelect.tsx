import React, { useState } from 'react'
import { components, MultiValue } from 'react-select'
import Creatable from 'react-select/creatable'
import Tooltip from '../../../Tooltip/Tooltip'

interface Props {
    restriction: FlipRestriction
    onTagsChange(tags: string[])
}

const customSelectStyle = {
    option: provided => ({
        ...provided,
        color: 'black'
    })
}

const MultiValueContainer = props => {
    return (
        <components.MultiValueContainer {...props}>
            <Tooltip type={'hover'} content={<div {...props.innerProps}>{props.children}</div>} tooltipContent={<span>{props.data.label}</span>} />
        </components.MultiValueContainer>
    )
}

function TagSelect(props: Props) {
    let [tagOptions, setTagOptions] = useState(
        props.restriction.tags
            ? props.restriction.tags.slice().map(value => {
                  return { value, label: value }
              })
            : []
    )

    function onTagsChange(
        value: MultiValue<{
            value: string
            label: string
        }>
    ) {
        let newTags = value.map(option => option.value)
        let newTagOptions = [...value]
        setTagOptions(newTagOptions)
        props.onTagsChange(newTags)
    }

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="finders">Tags</label>
                <Creatable
                    isMulti
                    options={tagOptions}
                    value={tagOptions}
                    styles={customSelectStyle}
                    closeMenuOnSelect={false}
                    components={{ MultiValueContainer }}
                    onChange={onTagsChange}
                />
            </div>
        </div>
    )
}

export default TagSelect
