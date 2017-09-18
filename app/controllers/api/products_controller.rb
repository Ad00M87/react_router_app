class Api::ProductsController < ApplicationController
  before_action :set_api_product, only: [:show, :update, :destroy]

  # GET /api/products
  # GET /api/products.json
  def index
    @api_products = Product.all
  end

  # GET /api/products/1
  # GET /api/products/1.json
  def show
  end

  # POST /api/products
  # POST /api/products.json
  def create
    @api_product = Product.new(api_product_params)

    if @api_product.save
      render :show
    else
      render json: @api_product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/products/1
  # PATCH/PUT /api/products/1.json
  def update
    if @api_product.update(api_product_params)
      render :show
    else
      render json: @api_product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/products/1
  # DELETE /api/products/1.json
  def destroy
    @api_product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_product
      @api_product = Product.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def api_product_params
      params.require(:product).permit(:name, :description, :price, :department)
    end
end
