require 'test_helper'

class MilitaryDiscountsControllerTest < ActionController::TestCase
  setup do
    @military_discount = military_discounts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:military_discounts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create military_discount" do
    assert_difference('MilitaryDiscount.count') do
      post :create, military_discount: { description: @military_discount.description }
    end

    assert_redirected_to military_discount_path(assigns(:military_discount))
  end

  test "should show military_discount" do
    get :show, id: @military_discount
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @military_discount
    assert_response :success
  end

  test "should update military_discount" do
    put :update, id: @military_discount, military_discount: { description: @military_discount.description }
    assert_redirected_to military_discount_path(assigns(:military_discount))
  end

  test "should destroy military_discount" do
    assert_difference('MilitaryDiscount.count', -1) do
      delete :destroy, id: @military_discount
    end

    assert_redirected_to military_discounts_path
  end
end
