Rails.application.routes.draw do
  devise_for :users
  root 'rooms#index'
  resources :room
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # mount ActionCable.server => '/cable'
end
