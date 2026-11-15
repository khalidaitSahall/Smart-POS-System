import { useEffect, useState } from 'react';

const currency = new Intl.NumberFormat('ar', { style: 'currency', currency: 'MAD' });

export default function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch('/api/products')
      .then(async (response) => {
        if (!response.ok) throw new Error('تعذر تحميل المنتجات');
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark">SP</div>
        <div>
          <h1>Smart POS</h1>
          <p>نظام نقاط البيع وإدارة المخزون</p>
        </div>
        <span className="web-badge">نسخة الويب</span>
      </header>

      <section className="welcome-card">
        <div>
          <p className="eyebrow">لوحة التحكم</p>
          <h2>مرحباً بك في نظام الكاشير</h2>
          <p>هذه نقطة بداية لواجهة الويب. اربط تسجيل الدخول والمبيعات والصفحات الأخرى بالـ API عند تنفيذ ميزاتها.</p>
        </div>
        <div className="welcome-icon" aria-hidden="true">🛒</div>
      </section>

      <section className="section-heading">
        <div>
          <p className="eyebrow">المخزون</p>
          <h2>المنتجات</h2>
        </div>
        <span className="count-pill">{status === 'ready' ? `${products.length} منتج` : '—'}</span>
      </section>

      {status === 'loading' && <p className="notice">جارٍ الاتصال بالخادم…</p>}
      {status === 'error' && <p className="notice error">تعذر تحميل المنتجات. تأكد من تشغيل الخادم وإعداد PostgreSQL.</p>}
      {status === 'ready' && products.length === 0 && <p className="notice">لا توجد منتجات بعد. أضف بيانات المنتجات إلى قاعدة البيانات للبدء.</p>}
      {status === 'ready' && products.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>المنتج</th><th>الباركود</th><th>السعر</th><th>المخزون</th></tr></thead>
            <tbody>{products.map((product) => (
              <tr key={product.id}>
                <td className="product-name">{product.name}</td>
                <td>{product.barcode || '—'}</td>
                <td>{currency.format(product.sell_price / 100)}</td>
                <td>{product.stock_quantity}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <footer>Smart POS · تطبيق ويب قابل للتوسعة</footer>
    </main>
  );
}
