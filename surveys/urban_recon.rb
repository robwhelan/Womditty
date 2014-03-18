# encoding: UTF-8
# Question#is_mandatory is now false by default. The default_mandatory option allows you to set
#   is_mandatory for all questions in a survey.
survey "Urban Recon", :default_mandatory => false do

  section "Urban Recon" do
    label "Answer based on where you currently live."

    group "Fun stuff" do
      q "What's your favorite restaurant for a date?"
      a :string

      q "What's your favorite restaurant for a quick lunch?"
      a :string
      
      q "Name three great things to do on a date night."
      a_1 :string
      a_2 :string
      a_3 :string
      
      q "Name three parks or public places you like to go to."
      a_1 :string
      a_2 :string
      a_3 :string

      q "Give a couple ideas of what you and your friends do for fun."
      a_1 :string
      a_2 :string
      a_3 :string

      q "Name three cultural things not to miss out on."
      a_1 :string
      a_2 :string
      a_3 :string
    end

    group "Family and Kids", :custom_class => "hidden" do

      q "Can you recommend a few good doctors?"
      a_1 "|OB-GYN", :string
      a_2 "|Pediatrician", :string
      a_3 "|Family Practicioner", :string
      a_4 "|Chiropractor", :string
      a_5 "|Veterinarian", :string

      q "Where's a good place to deliver a baby?"
      a :string

      q "Where are some good childcare facilities?"
      a_1 :string
      a_2 :string
      a_3 :string
      
      q "How much is a babysitter of two kids paid per hour?", :pick => :one
      a '$6'
      a '$7'
      a '$8'
      a '$9'
      a '$10'
      a '$11'
      a '$12'
      a '$13'
      a '$14'
      a '$15'
      a '$16'
      
      q "Name three great family-friendly restaurants."
      a_1 :string
      a_2 :string
      a_3 :string

      q "Name three fun activities for kids."
      a_1 :string
      a_2 :string
      a_3 :string
      
      q "Which schools have good reputations?"
      a_1 :string
      a_2 :string
      a_3 :string

      q "Which schools have bad reputations?"
      a_1 :string
      a_2 :string
      a_3 :string
      
      q "Who do you contact to get kids in:"
      a_1 "|Gymnastics", :string
      a_2 "|Dance", :string
      a_3 "|Karate", :string
      a_4 "|Ballet", :string
      a_5 "|Baseball", :string
      a_6 "|Basketball", :string
      a_7 "|Soccer", :string
      a_8 "|Football", :string
      a_9 "|Lacrosse", :string
      a_10 "|Music", :string
      a_11 "|Art", :string
      a_12 "|Baseball", :string
      a_13 "|Swimming", :string
      a_14 "|Any Other After School Stuff", :string
      
    end

    group "Community", :custom_class => 'hidden' do

      q "Can you recommend a good gym?"
      a :string
      
      q "Can you recommend three good religious communities, like churches, synagogues, and mosques?"
      a_1 :string
      a_2 :string
      a_3 :string
      
      q "Which cities or areas have bad reputations among people like you?"
      a_1 :string
      a_2 :string
      a_3 :string
      
      q "Which cities or areas have great reputations among people like you?"
      a_1 :string
      a_2 :string
      a_3 :string
      
      q "You'll fight traffic going to the base if you live in any of these places:"
      a_1 :string
      a_2 :string
      
      q "You'll have a short commute going to the base if you live in any of these places:"
      a_1 :string
      a_2 :string
      
      q "Can you recommend a few good apartment complexes?"
      a_1 :string
      a_2 :string
      a_3 :string

      q "Where you live, cost of living is:", :pick => :one
      a "Very Low"
      a "Low"
      a "Average"
      a "High"
      a "Very High"

      q "Name some employers friendly to military spouses:"
      a_1 :string
      a_2 :string
      a_3 :string
      
      q "Are there any good military-friendly schools or colleges in the area?"
      a_1 :string
      a_2 :string
      a_3 :string
            
      q "How do you get involved in these activities?"
      a_1 "|Mom stroller groups", :string
      a_2 "|Mothers of Preschoolers (MOPS)", :string
      a_3 "|Volunteering", :string
      a_4 "|Breastfeeding groups", :string
      a_5 "|Cooking classes", :string
      a_6 "|Group fitness classes", :string
      a_7 "|Political activities", :string
      a_8 "|Base or command activities", :string      
      
    end
    
    group "Practical Stuff", :custom_class => 'hidden' do
      
      q "Please recommend a..."
      a_1 "|Grocery store", :string
      a_2 "|Another good grocery store", :string
      a_3 "|Drug store", :string
      a_4 "|WalMart / Target / Kmart and its location", :string
      a_5 "|Hair dresser", :string
      a_6 "|Spa or massage place", :string
      a_7 "|Nail place", :string
      a_8 "|Coffee shop", :string
      a_9 "|Dry cleaner", :string
      a_10 "|Fast food place", :string
      a_11 "|Hardware store", :string
      a_12 "|Craft store", :string
      a_13 "|Office supplies store", :string
      a_14 "|Clothing store", :string
      a_15 "|Shoe store", :string
      a_16 "|Pet food store", :string
      a_17 "|Handyman", :string
      
      q "Who's your cable provider?"
      a :string
      
      q "Who is your cell phone provider?"
      a :string
      
      q "What's the name of your electric company?"
      a :string
      
      q "What's your typical monthly electrical bill?"
      a "$", :integer
    
      q "What's your typical monthly cable bill?"
      a "$", :integer
      
      q "In general, how's the traffic?", :pick => :one
      a "Almost nonexistent"
      a "Light"
      a "Average"
      a "Heavy"
      a "Crazy"
      
      q "In general, how are the drivers?", :pick => :one
      a "Safer than average"
      a "Average"
      a "More dangerous than average"
      
      q "Anything we should know about the weather?"
      a :string
      
    end
    
    group "Demographic Info", :custom_class => 'hidden' do
      label "This info will not be linked to you. It is used when sorting survey responses."
      
      q "Zip code:"
      a :integer
      
      q "Subdivision:"
      a :string
      
      q "Education level", :pick => :one
      a "High School"
      a "College degree"
      a "Masters or Professional degree"
      a "Doctorate"
      
      q "Gender", :pick => :one
      a "Male"
      a "Female"

      q_selfmilitary "Are you employed by the military?", :pick => :one
      a_1 "Active duty"
      a_2 "Reserves"
      a_3 "Civilian contractor"
      a_4 "None of the above"

      q_selfmilitarya "Which branch?", :pick => :one
      a "Air Force"
      a "Army"
      a "Coast Guard"
      a "Marines"
      a "Navy"
      dependency :rule => "A or B or C"
      condition_A :q_selfmilitary, "==", :a_1
      condition_B :q_selfmilitary, "==", :a_2
      condition_C :q_selfmilitary, "==", :a_3

      q_selfmilitaryb "Which command or base do you work at most days?"
      a :string
      dependency :rule => "A or B or C"
      condition_A :q_selfmilitary, "==", :a_1
      condition_B :q_selfmilitary, "==", :a_2
      condition_C :q_selfmilitary, "==", :a_3

      q_selfmilitaryc "How long is your commute?"
      a "|minutes", :integer
      dependency :rule => "A or B or C"
      condition_A :q_selfmilitary, "==", :a_1
      condition_B :q_selfmilitary, "==", :a_2
      condition_C :q_selfmilitary, "==", :a_3

      q_selfmilitaryRank "What's your rank?", :pick => :one, :display_type => :dropdown
      ["E1", "E2", "E3", "E4","E5","E6","E7","E8","E9",
        "O1","O2","O3","O4","O5","O6","O7","O8","O9",
        "W1","W2","W3","W4","W5"].each{ |rank| a rank}
      dependency :rule => "A or B"
      condition_A :q_selfmilitary, "==", :a_1
      condition_B :q_selfmilitary, "==", :a_2

      q_marital "Marital status", :pick => :one
      a_1 "Married"
      a_2 "Unmarried"

      q_maritala "Is your spouse employed by the military?", :pick => :one
      a_1 "Active duty"
      a_2 "Reserves"
      a_3 "Civilian contractor"
      a_4 "None of the above"
      dependency :rule => "A"
      condition_A :q_marital, "==", :a_1

      q_spousemilitarya "Which branch?", :pick => :one
      a "Air Force"
      a "Army"
      a "Coast Guard"
      a "Marines"
      a "Navy"
      dependency :rule => "A or B or C"
      condition_A :q_maritala, "==", :a_1
      condition_B :q_maritala, "==", :a_2
      condition_C :q_maritala, "==", :a_3

      q_spousemilitaryb "Which command or base does he/she work at most days?"
      a :string
      dependency :rule => "A or B or C"
      condition_A :q_maritala, "==", :a_1
      condition_B :q_maritala, "==", :a_2
      condition_C :q_maritala, "==", :a_3

      q_spousemilitaryc "How long is his/her commute?"
      a "|minutes", :integer
      dependency :rule => "A or B or C"
      condition_A :q_maritala, "==", :a_1
      condition_B :q_maritala, "==", :a_2
      condition_C :q_maritala, "==", :a_3

      q_spousemilitaryd "What's your spouse's rank?", :pick => :one, :display_type => :dropdown
      ["E1", "E2", "E3", "E4","E5","E6","E7","E8","E9",
        "O1","O2","O3","O4","O5","O6","O7","O8","O9",
        "W1","W2","W3","W4","W5"].each{ |rank| a rank}
      dependency :rule => "A or B"
      condition_A :q_maritala, "==", :a_1
      condition_B :q_maritala, "==", :a_2

      
      q "Approximate annual household income:", :pick => :one
      a "$30K or less"
      a "$40K"
      a "$50K"
      a "$60K"
      a "$70K"
      a "$80K"
      a "$90K"
      a "$100K"
      a "$110K"
      a "$120K"
      a "$130K"
      a "$140K"
      a "$150K"
      a "More than $150K"

      q_kids "Do you have any kids?", :pick => :one
      a_1 "Yes"
      a_2 "No"
      
      q_kidcount "How many?", :pick => :one
      a "1"
      a "2"
      a "3"
      a "4"
      a "5+"
      dependency :rule => "A"
      condition_A :q_kids, "==", :a_1
  
    end
 
  end
end
