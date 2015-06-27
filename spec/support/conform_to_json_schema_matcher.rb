require 'json-schema'

RSpec::Matchers.define :conform_to_json_schema do |expected|
  match do |actual|
    schema = expected.kind_of?(String) ? JSON.parse(expected) : expected
    JSON::Validator.fully_validate(schema, actual).empty?
  end

  failure_message do |actual|
    schema = expected.kind_of?(String) ? JSON.parse(expected) : expected
    validation_result = JSON::Validator.fully_validate(schema, actual)
    message =  "\nExpected the following JSON:\n"
    message += "#{JSON.pretty_generate(actual)}\n"
    message += "To match schema, but found the following discrepancies:\n"
    message += validation_result.map { |e| "  * #{e}" }.join("\n")
    message
  end
end

