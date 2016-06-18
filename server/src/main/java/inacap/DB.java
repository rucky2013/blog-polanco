package inacap;

import com.mysql.cj.jdbc.MysqlDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class DB {

    private static DB instance;
    private MysqlDataSource source;
    private Connection connection;

    private DB() {
        source = new MysqlDataSource();
        source.setServerName("localhost");
        source.setPort(3306);
        source.setDatabaseName("blog_polanco");
        source.setUser("root");
    }

    public static DB getInstance() {
        if (instance == null)
            instance = new DB();
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
