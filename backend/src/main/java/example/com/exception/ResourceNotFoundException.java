package example.com.exception;

public class ResourceNotFoundException extends Exception{
	public ResourceNotFoundException(final String message) {
		super(message);
	}
}
