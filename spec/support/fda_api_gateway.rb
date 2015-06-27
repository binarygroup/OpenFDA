require 'singleton'
require 'httparty'

# FDA API Gateway
class FdaApiGateway
  include Singleton
  include HTTParty
  base_uri 'https://api.fda.gov/drug/event.json'

  # Request a full list
  def request_list
    self.class.get('')
  end

  # Request aggregated counted list
  def request_count(count)
    self.class.get('', query: merged_params(count: count))
  end

  private

  def merged_params(merge_with)
    {
      api_key: api_key,
      limit: '',
      search: '',
      skip: 0
    }.merge(merge_with)
  end

  def api_key
    ENV['FDA_API_KEY'] || 'AdI7VwjhIVFykmklU56DkJGwHZXA2x725diFJSGB'
  end
end

