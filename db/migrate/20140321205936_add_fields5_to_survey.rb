class AddFields5ToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :cell_phone_reception, :string
  end
end
