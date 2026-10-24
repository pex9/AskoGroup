"""Server locale: serve il sito e permette al pannello admin di salvare in data/ e uploads/."""
import base64, http.server, json, os
from urllib.parse import unquote
os.chdir(os.path.dirname(os.path.abspath(__file__)))
def safe(p):
    p = os.path.normpath(unquote(p)).replace('\\', '/')
    return p if not p.startswith(('..', '/')) and p.split('/')[0] in ('data', 'uploads') else None
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store'); super().end_headers()
    def _s(self, c, b=b''):
        self.send_response(c); self.send_header('Content-Length', str(len(b))); self.end_headers(); self.wfile.write(b)
    def do_GET(self):
        if self.path == '/api/ping': return self._s(200, b'asko-local')
        if self.path.startswith('/api/read'):
            p = safe(self.path.split('path=', 1)[-1])
            return self._s(200, open(p, 'rb').read()) if p and os.path.isfile(p) else self._s(404, b'no')
        super().do_GET()
    def do_POST(self):
        if self.path != '/api/write': return self._s(404)
        d = json.loads(self.rfile.read(int(self.headers['Content-Length']))); p = safe(d['path'])
        if not p: return self._s(400, b'percorso non valido')
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, 'wb') as f: f.write(base64.b64decode(d['b64']))
        self._s(200, b'ok')
print('Sito: http://localhost:8000   Pannello: http://localhost:8000/admin/')
http.server.ThreadingHTTPServer(('127.0.0.1', 8000), H).serve_forever()
