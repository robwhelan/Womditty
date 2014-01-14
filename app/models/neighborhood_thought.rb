class NeighborhoodThought < ActiveRecord::Base
  belongs_to :user
  belongs_to :neighborhood

  attr_accessible :user_id, :neighborhood_id, :community_amenities, :cost_of_living, :crime, :grocery_stores, :lifestyle,
                  :night_life, :noise, :pets, :shopping, :kids, :traffic, :walkability, :not_love, :love, :schools

  def process_posts(user_id)
    neighborhood = self.neighborhood
    neighborhoodString = " (" + neighborhood.name.to_s + ")"

    unless self.community_amenities.empty?
      Post.create(:body => self.community_amenities + neighborhoodString, :user_id => user_id)
            
    end
    
    unless self.cost_of_living.empty?
      Post.create(:body => self.cost_of_living + neighborhoodString, :user_id => user_id)
            
    end

    unless self.crime.empty?
      Post.create(:body => self.crime + neighborhoodString, :user_id => user_id)
            
    end

    unless self.grocery_stores.empty?
      Post.create(:body => self.grocery_stores + neighborhoodString, :user_id => user_id)
            
    end

    unless self.lifestyle.empty?
      Post.create(:body => self.lifestyle + neighborhoodString, :user_id => user_id)
            
    end
    
    unless self.night_life.empty?
      Post.create(:body => self.night_life + neighborhoodString, :user_id => user_id)
            
    end
    
    unless self.noise.empty?
      Post.create(:body => self.noise + neighborhoodString, :user_id => user_id)
            
    end
    
    unless self.pets.empty?
      Post.create(:body => self.pets + neighborhoodString, :user_id => user_id)
            
    end
    
    unless self.shopping.empty?
      Post.create(:body => self.shopping + neighborhoodString, :user_id => user_id)
            
    end
    
    unless self.kids.empty?
      Post.create(:body => self.kids + neighborhoodString, :user_id => user_id)
            
    end
    
    unless self.traffic.empty?
      Post.create(:body => self.traffic + neighborhoodString, :user_id => user_id)
            
    end
    
    unless self.walkability.empty?
      Post.create(:body => self.walkability + neighborhoodString, :user_id => user_id)
            
    end

    unless self.not_love.empty?
      Post.create(:body => self.not_love + neighborhoodString, :user_id => user_id)
            
    end
    
    unless self.love.empty?
      Post.create(:body => self.love + neighborhoodString, :user_id => user_id)
            
    end

  end
  
end
