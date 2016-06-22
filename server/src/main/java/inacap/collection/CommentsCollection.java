package inacap.collection;

import inacap.Db;
import inacap.models.Comment;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CommentsCollection {

    public static List<Comment> fetch(int postId) throws Exception {
        try {
            String query = "select * from Comments where postId = ? order by id asc";
            PreparedStatement statement = Db.getInstance().setConnection().prepareStatement(query);
            statement.setInt(1, postId);

            ResultSet cursor = statement.executeQuery();

            List<Comment> comments = new ArrayList<>();

            while (cursor.next()) {
                comments.add(new Comment(
                        cursor.getInt("id"),
                        cursor.getString("body"),
                        cursor.getTimestamp("createdAt"),
                        cursor.getInt("postId")
                ));
            }
            return comments;
        } finally {
            Db.getInstance().closeConnection();
        }
    }

    public static Comment find(int id) throws Exception {
        try {
            String query = "select * from Comments where id = ?";
            PreparedStatement statement = Db.getInstance().setConnection().prepareStatement(query);
            statement.setInt(1, id);

            ResultSet cursor = statement.executeQuery();
            if (cursor.next()) {
                return new Comment(
                        cursor.getInt("id"),
                        cursor.getString("body"),
                        cursor.getTimestamp("createdAt"),
                        cursor.getInt("postId")
                );
            }
            return null;
        } finally {
            Db.getInstance().closeConnection();
        }
    }

    public static Comment store(int postId, String body) throws Exception {
        try {
            String query = "insert into Comments(body, postId) values(?, ?)";
            PreparedStatement statement = Db.getInstance().setConnection().prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, body);
            statement.setInt(2, postId);

            if (statement.executeUpdate() == 0)
                throw new Exception("Something went wrong at storing comment");

            ResultSet cursor = statement.getGeneratedKeys();
            if (cursor.next())
                return find(cursor.getInt(1));
            return null;
        } finally {
            Db.getInstance().closeConnection();
        }
    }

    public static Comment replace(int id, String body) throws Exception {
        try {
            String query = "update Comments set body = ? where id = ?";
            PreparedStatement statement = Db.getInstance().setConnection().prepareStatement(query);
            statement.setString(1, body);
            statement.setInt(2, id);

            int affectedRows = statement.executeUpdate();
            if (affectedRows == 1)
                return find(id);
            return null;
        } finally {
            Db.getInstance().closeConnection();
        }
    }

    public static boolean remove(int id) throws Exception {
        try {
            String query = "delete from Comments where id = ?";
            PreparedStatement statement = Db.getInstance().setConnection().prepareStatement(query);
            statement.setInt(1, id);

            return statement.executeUpdate() == 1;
        } finally {
            Db.getInstance().closeConnection();
        }
    }

}
