import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Select, Option } from '@strapi/design-system/Select'
import { useIntl } from 'react-intl'
import getTrad from '../../utils/getTrad'

const CountriesSelect = ({
  value,
  onChange,
  name,
  intlLabel,
  labelAction,
  required,
  attribute,
  description,
  placeholder,
  disabled,
  error,
}) => {
  const [allIsSelected, setAllIsSelected] = useState(false)

  const { formatMessage, messages } = useIntl()
  const parsedOptions = JSON.parse(messages[getTrad('countries')])

  useEffect(() => {
    value.indexOf('ALL') !== -1
      ? setAllIsSelected(true)
      : setAllIsSelected(false)
  }, [value])

  return (
    <>
      {labelAction}
      <Select
        name={name}
        id={name}
        label={formatMessage(intlLabel)}
        error={error}
        disabled={disabled}
        required={required}
        hint={description && formatMessage(description)}
        onChange={(v) => {
          if (v.includes('ALL')) {
            v = ['ALL']
          }
          onChange({
            target: {
              name: name,
              value: JSON.stringify(v.filter(Boolean)),
              type: attribute.type,
            },
          })
        }}
        placeholder={placeholder}
        multi
        value={JSON.parse(value)}
        withTags>
        {[
          ...(attribute['extra-options'].map((extraOption) =>
            extraOption.split(':'),
          ) || []),
          ...Object.entries(parsedOptions),
          ,
        ].map(([countryCode, countryName]) => (
          <Option
            value={countryCode}
            key={countryCode}
            style={{
              opacity: countryCode !== 'ALL' && allIsSelected ? 0.5 : 1,
              cursor:
                countryCode !== 'ALL' && allIsSelected
                  ? 'not-allowed'
                  : 'pointer',
            }}>
            {countryName}
          </Option>
        ))}
      </Select>
    </>
  )
}

CountriesSelect.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
}

CountriesSelect.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
}

export default CountriesSelect
