#!/usr/bin/env python3
"""Local server that serves static files and falls back to dashboard.html for SPA routes."""
import http.server
import os

PORT = 3333
DIR = os.path.dirname(os.path.abspath(__file__))

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def do_GET(self):
        # Serve static files normally (js, css, images, fonts, etc.)
        path = self.path.split('?')[0]
        file_path = os.path.join(DIR, path.lstrip('/'))

        if os.path.isfile(file_path):
            return super().do_GET()

        # For any route that doesn't match a file, serve dashboard.html
        self.path = '/dashboard.html'
        return super().do_GET()

if __name__ == '__main__':
    print(f"Serving Quickteller Business at http://localhost:{PORT}")
    print(f"Dashboard: http://localhost:{PORT}/dashboard")
    print("Press Ctrl+C to stop")
    with http.server.HTTPServer(('', PORT), SPAHandler) as httpd:
        httpd.serve_forever()
