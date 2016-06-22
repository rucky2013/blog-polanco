package inacap;

import com.mysql.cj.jdbc.MysqlDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class Db {

    private static Db instance;
    private MysqlDataSource source;
    private Connection connection;

    private Db() {
        source = new MysqlDataSource();
        source.setServerName("localhost");
        source.setDatabaseName("blog_polanco");
        source.setUser("root");
    }

    public static Db getInstance() {
        if (instance == null)
            instance = new Db();
        return instance;
    }

    public Connection setConnection() throws SQLException {
        connection = source.getConnection();
        return connection;
    }

    public Connection getConnection() {
        return connection;
    }

    public Connection closeConnection() throws SQLException {
        if (connection != null)
            connection.close();
        return connection;
    }

}
