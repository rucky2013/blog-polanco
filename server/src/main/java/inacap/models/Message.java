package inacap.models;

public class Message {

    private String message;
    private int statusCode;

    public Message(String message, int statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }

    public Message(String message) {
        this(message, 200);
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    @Override
    public String toString() {
        return "{\"message\":\"" + this.message + "\"}";
    }
}
