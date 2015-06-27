RSpec.describe 'FDA API' do
  SCHEMAS = {
    count_integer_terms_json_schema: %w(patient.reaction.reactionoutcome primarysource.qualification patientonsetage patient.reaction.reactionoutcome patientsex),
    count_string_terms_json_schema: %w(drugdosageform medicinalproduct occurcountry receivedate reportercountry),
    count_float_terms_json_schema: %w(patientweight)
  }

  SCHEMAS.each do |schema_name, counts|
    describe "#{schema_name.to_s.gsub('_', ' ').capitalize} schema conformity" do
      let(:schema) { File.read(File.expand_path("../../schemas/#{schema_name}.json", __FILE__)) }
      counts.each do |count|
        describe "API call counting #{count} validation" do
          subject { FdaApiGateway.instance.request_count(count) }
          it { is_expected.to conform_to_json_schema(schema) }
        end
      end
    end
  end

  describe 'Index API schema conformity' do
    let(:schema) { File.read(File.expand_path("../../schemas/index_json_schema.json", __FILE__)) }
    subject { FdaApiGateway.instance.request_list }
    it { is_expected.to conform_to_json_schema(schema) }
  end
end
