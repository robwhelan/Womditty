class CreatePreEmails < ActiveRecord::Migration
  def change
    create_table :pre_emails do |t|
      t.string :email

      t.timestamps
    end
  end
end
