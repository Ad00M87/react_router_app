json.extract! api_product, :id, :name, :description, :department, :price
json.url api_product_url(api_product, format: :json)
