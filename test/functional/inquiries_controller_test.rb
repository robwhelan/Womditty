require 'test_helper'

class InquiriesControllerTest < ActionController::TestCase
  setup do
    @inquiry = inquiries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:inquiries)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create inquiry" do
    assert_difference('Inquiry.count') do
      post :create, inquiry: { command: @inquiry.command, email: @inquiry.email, first_name: @inquiry.first_name, last_name: @inquiry.last_name, move_date: @inquiry.move_date, number_of_bedrooms: @inquiry.number_of_bedrooms, number_of_people: @inquiry.number_of_people, phone_number: @inquiry.phone_number, rank: @inquiry.rank }
    end

    assert_redirected_to inquiry_path(assigns(:inquiry))
  end

  test "should show inquiry" do
    get :show, id: @inquiry
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @inquiry
    assert_response :success
  end

  test "should update inquiry" do
    put :update, id: @inquiry, inquiry: { command: @inquiry.command, email: @inquiry.email, first_name: @inquiry.first_name, last_name: @inquiry.last_name, move_date: @inquiry.move_date, number_of_bedrooms: @inquiry.number_of_bedrooms, number_of_people: @inquiry.number_of_people, phone_number: @inquiry.phone_number, rank: @inquiry.rank }
    assert_redirected_to inquiry_path(assigns(:inquiry))
  end

  test "should destroy inquiry" do
    assert_difference('Inquiry.count', -1) do
      delete :destroy, id: @inquiry
    end

    assert_redirected_to inquiries_path
  end
end
