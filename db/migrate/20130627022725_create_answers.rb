class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.belongs_to :post
      t.belongs_to :user
      t.text :body
      t.integer :likes

      t.timestamps
    end
    add_index :answers, :post_id
    add_index :answers, :user_id
  end
end
