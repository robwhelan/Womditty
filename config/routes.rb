Womditty::Application.routes.draw do

  get "pages/google_map"
  get "pages/census"

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :users, :only => [:index, :show] do
    resources :follows, :only => [:create, :destroy]
  end

  resources :military_discounts do
    member do
      post :vote_up
      post :vote_down
    end
  end

  resources :answers do
    member do
      post :vote_up
      post :vote_down
    end
  end

  resources :posts do
    member do
      post :vote_up
      post :vote_down
      get :hide_answers
    end
  end

  resources :comments do
    member do
      post :vote_up
      post :vote_down
    end
  end

  resources :activities
  resources :center_coordinates
  resources :coordinates
  resources :career_specialties
  resources :users
  resources :military_branches
  resources :neighborhoods
  resources :cities
  resources :duty_stations
  resources :reviews
  resources :photos
  resources :places

  get 'tags/:tag', to: 'places#index', as: :tag

  root :to => "military_discounts#index"
  
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
