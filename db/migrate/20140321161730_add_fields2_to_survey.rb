class AddFields2ToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :self_rank_class, :string
    add_column :surveys, :spouse_rank_class, :string
  end
end
