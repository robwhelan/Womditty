class CreateEngagements < ActiveRecord::Migration
  def change
    create_table :engagements do |t|
      t.belongs_to :vendor
      t.string :type

      t.timestamps
    end
    add_index :engagements, :vendor_id
  end
end
