require 'test_helper'

class NeighborhoodTopicsControllerTest < ActionController::TestCase
  setup do
    @neighborhood_topic = neighborhood_topics(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:neighborhood_topics)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create neighborhood_topic" do
    assert_difference('NeighborhoodTopic.count') do
      post :create, neighborhood_topic: { name: @neighborhood_topic.name }
    end

    assert_redirected_to neighborhood_topic_path(assigns(:neighborhood_topic))
  end

  test "should show neighborhood_topic" do
    get :show, id: @neighborhood_topic
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @neighborhood_topic
    assert_response :success
  end

  test "should update neighborhood_topic" do
    put :update, id: @neighborhood_topic, neighborhood_topic: { name: @neighborhood_topic.name }
    assert_redirected_to neighborhood_topic_path(assigns(:neighborhood_topic))
  end

  test "should destroy neighborhood_topic" do
    assert_difference('NeighborhoodTopic.count', -1) do
      delete :destroy, id: @neighborhood_topic
    end

    assert_redirected_to neighborhood_topics_path
  end
end
