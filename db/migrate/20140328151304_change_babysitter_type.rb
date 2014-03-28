class ChangeBabysitterType < ActiveRecord::Migration
  def change
    change_column :surveys, :babysitter_pay, :string
  end
end
