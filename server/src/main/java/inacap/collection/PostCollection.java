package inacap.collection;

import inacap.DB;
import inacap.models.Post;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class PostCollection {

    public static List<Post> fetch() throws Exception {
        try {
            String query = "select * from Posts order by id asc";
            PreparedStatement statement = DB.getInstance().setConnection().prepareStatement(query);

            ResultSet cursor = statement.executeQuery();

            List<Post> posts = new ArrayList<>();

            while (cursor.next()) {
                posts.add(new Post(
                        cursor.getInt("id"),
                        cursor.getString("title"),
                        cursor.getString("body"),
                        cursor.getTimestamp("createdAt")
                ));
            }
            return posts;
        } finally {
            DB.getInstance().closeConnection();
        }
    }

    public static Post find(int id) throws Exception {
        try {
            String query = "select * from Posts where id = ?";
            PreparedStatement statement = DB.getInstance().setConnection().prepareStatement(query);
            statement.setInt(1, id);

            ResultSet cursor = statement.executeQuery();
            if (cursor.next()) {
                return new Post(
                        cursor.getInt("id"),
                        cursor.getString("title"),
                        cursor.getString("body"),
                        cursor.getTimestamp("createdAt")
                );
            }
            return null;
        } finally {
            DB.getInstance().closeConnection();
        }
    }

    public static Post store(String title, String body) throws Exception {
        try {
            String query = "insert into Posts(title, body) values(?, ?)";
            PreparedStatement statement = DB.getInstance().setConnection().prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, title);
            statement.setString(2, body);

            if (statement.executeUpdate() == 0)
                throw new Exception("Something went wrong at storing post.");

            ResultSet cursor = statement.getGeneratedKeys();
            if(cursor.next())
                return find(cursor.getInt(1));
            return null;
        } finally {
            DB.getInstance().closeConnection();
        }
    }

    public static boolean replace(int id, String title, String body) throws Exception {
        try {
            String query = "update Posts set title = ?, body = ? where id = ?";
            PreparedStatement statement = DB.getInstance().setConnection().prepareStatement(query);
            statement.setString(1, title);
            statement.setString(2, body);
            statement.setInt(3, id);

            return statement.executeUpdate() == 1;
        } finally {
            DB.getInstance().closeConnection();
        }
    }

    public static boolean remove(int id) throws Exception {
        try {
            String query = "delete from Posts where id = ?";
            PreparedStatement statement = DB.getInstance().setConnection().prepareStatement(query);
            statement.setInt(1, id);

            return statement.executeUpdate() == 1;
        } finally {
            DB.getInstance().closeConnection();
        }
    }

    public static void truncate() throws Exception {
        try {
            DB.getInstance().setConnection().prepareStatement("truncate Posts").executeUpdate();
        } finally {
            DB.getInstance().closeConnection();
        }
    }

}
