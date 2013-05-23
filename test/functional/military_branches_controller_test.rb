require 'test_helper'

class MilitaryBranchesControllerTest < ActionController::TestCase
  setup do
    @military_branch = military_branches(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:military_branches)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create military_branch" do
    assert_difference('MilitaryBranch.count') do
      post :create, military_branch: { name: @military_branch.name }
    end

    assert_redirected_to military_branch_path(assigns(:military_branch))
  end

  test "should show military_branch" do
    get :show, id: @military_branch
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @military_branch
    assert_response :success
  end

  test "should update military_branch" do
    put :update, id: @military_branch, military_branch: { name: @military_branch.name }
    assert_redirected_to military_branch_path(assigns(:military_branch))
  end

  test "should destroy military_branch" do
    assert_difference('MilitaryBranch.count', -1) do
      delete :destroy, id: @military_branch
    end

    assert_redirected_to military_branches_path
  end
end
