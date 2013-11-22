require 'test_helper'

class NeighborhoodThoughtsControllerTest < ActionController::TestCase
  setup do
    @neighborhood_thought = neighborhood_thoughts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:neighborhood_thoughts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create neighborhood_thought" do
    assert_difference('NeighborhoodThought.count') do
      post :create, neighborhood_thought: {  }
    end

    assert_redirected_to neighborhood_thought_path(assigns(:neighborhood_thought))
  end

  test "should show neighborhood_thought" do
    get :show, id: @neighborhood_thought
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @neighborhood_thought
    assert_response :success
  end

  test "should update neighborhood_thought" do
    put :update, id: @neighborhood_thought, neighborhood_thought: {  }
    assert_redirected_to neighborhood_thought_path(assigns(:neighborhood_thought))
  end

  test "should destroy neighborhood_thought" do
    assert_difference('NeighborhoodThought.count', -1) do
      delete :destroy, id: @neighborhood_thought
    end

    assert_redirected_to neighborhood_thoughts_path
  end
end
