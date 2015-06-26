# require 'rack/proxy'

# class FdaProxy < Rack::Proxy
#   def initialize(app)
#     @app = app
#   end

#   def call(env)
#     # call super if we want to proxy, otherwise just handle regularly via call
#     (proxy?(env) && super) || @app.call(env)
#   end

#   def proxy?(env)
#     # do not alter env here, but return true if you want to proxy for this request.
#     return true
#   end

#   def rewrite_env(env)
#     # change the env here
#     env["HTTP_HOST"] = "api.fda.gov"
#     env
#   end
# end