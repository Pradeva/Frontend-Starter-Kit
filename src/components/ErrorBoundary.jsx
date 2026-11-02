import { Component } from 'react';
import { Button } from '@/components/ui/Button';

// Error boundary kelas (satu-satunya cara menangkap render error di React).
// Membungkus seluruh aplikasi agar crash tidak menampilkan layar putih.
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Di produksi, kirim ke layanan monitoring (Sentry, dll) di sini.
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Terjadi kesalahan</h1>
          <p className="max-w-md text-sm text-slate-600">
            Maaf, ada yang tidak beres. Coba muat ulang halaman.
          </p>
          <Button onClick={this.handleReset}>Kembali ke beranda</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
