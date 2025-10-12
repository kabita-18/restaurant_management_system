package example.com.exception;

import java.time.LocalTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import example.com.service.ManagementServiceException;
import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ExceptionHandlerControllerAdvice {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public @ResponseBody ExceptionalResponse handleResourceNotFound(final ResourceNotFoundException exception,
            final HttpServletRequest request) {

        return createExceptionResponse(exception, request);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public @ResponseBody ExceptionalResponse handleException(final Exception exception,
            final HttpServletRequest request) {

        exception.printStackTrace();  // Print stack trace for debugging

        return createExceptionResponse(exception, request);
    }

    @ExceptionHandler(ManagementServiceException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public @ResponseBody ExceptionalResponse handleAccountServiceException(final ManagementServiceException exception,
            final HttpServletRequest request) {

        return createExceptionResponse(exception, request);
    }

    private ExceptionalResponse createExceptionResponse(final Exception exception, final HttpServletRequest request) {
        ExceptionalResponse error = new ExceptionalResponse();
        error.setErrorMessage(exception.getMessage());
        error.setTimeStamp(LocalTime.now().toString());
        error.setRequestedURI(request.getRequestURI());
        return error;
    }
}
