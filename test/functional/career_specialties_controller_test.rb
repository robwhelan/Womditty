require 'test_helper'

class CareerSpecialtiesControllerTest < ActionController::TestCase
  setup do
    @career_specialty = career_specialties(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:career_specialties)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create career_specialty" do
    assert_difference('CareerSpecialty.count') do
      post :create, career_specialty: { name: @career_specialty.name }
    end

    assert_redirected_to career_specialty_path(assigns(:career_specialty))
  end

  test "should show career_specialty" do
    get :show, id: @career_specialty
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @career_specialty
    assert_response :success
  end

  test "should update career_specialty" do
    put :update, id: @career_specialty, career_specialty: { name: @career_specialty.name }
    assert_redirected_to career_specialty_path(assigns(:career_specialty))
  end

  test "should destroy career_specialty" do
    assert_difference('CareerSpecialty.count', -1) do
      delete :destroy, id: @career_specialty
    end

    assert_redirected_to career_specialties_path
  end
end
