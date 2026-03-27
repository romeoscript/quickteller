# Use an official lightweight Python image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Make port 8080 available to the world outside this container
# (This matches the port we set in serve.py)
EXPOSE 8080

# Run serve.py when the container launches
CMD ["python3", "serve.py"]
