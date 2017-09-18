Rails.application.routes.draw do
  namespace :api do
    resources :products, except: [:new, :edit]
  end

  # NO OTHER ROUTES BELOW THIS!!
  get '*other', to: 'static#index'
end
