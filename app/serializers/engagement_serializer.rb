class EngagementSerializer < ActiveModel::Serializer
  attributes :id, :type
  has_one :vendor
end
