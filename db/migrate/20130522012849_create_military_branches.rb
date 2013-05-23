class CreateMilitaryBranches < ActiveRecord::Migration
  def change
    create_table :military_branches do |t|
      t.string :name

      t.timestamps
    end
  end
end
