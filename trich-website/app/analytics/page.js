"use client";
import React, { useEffect, useState } from "react";
import { mockFetch as fetch } from "@/lib/mockApi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function monthToInputValue(month) {
  return month;
}

export default function AnalyticsPage() {
  const now = new Date();
  const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const [month, setMonth] = useState(defaultMonth);

  const [daily, setDaily] = useState({});
  const [barbers, setBarbers] = useState({});
  const [services, setServices] = useState({});
  const [customers, setCustomers] = useState(null);
  const [busyHours, setBusyHours] = useState({});
  const [recurringGap, setRecurringGap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  async function fetchAll() {
    setLoading(true);
    setError(null);
    try {
      const endpoints = [
        `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/analytics/reservations?month=${month}`,
        `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/analytics/barbers?month=${month}`,
        `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/analytics/services?month=${month}`,
        `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/analytics/customers?month=${month}`,
        `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/analytics/busy-hours?month=${month}`,
        `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/analytics/recurring-gap`,
      ];

      const responses = await Promise.all(endpoints.map((ep) => fetch(ep)));

      responses.forEach((r, i) => { if (!r.ok) throw new Error(`Failed to load endpoint: ${endpoints[i]}`); });

      const [dailyJson, barbersJson, servicesJson, customersJson, busyJson, gapJson] = await Promise.all(
        responses.map((r) => r.json())
      );

      setDaily(dailyJson);
      setBarbers(barbersJson);
      setServices(servicesJson);
      setCustomers(customersJson);
      setBusyHours(busyJson);
      setRecurringGap(gapJson);
    } catch (e) {
      console.error(e);
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  const dailyData = Object.entries(daily).map(([k, v]) => ({ date: k, value: v }));
  const barbersData = Object.entries(barbers).map(([k, v]) => ({ barber: k, count: v.count, totalRevenue: Number(v.totalRevenue) }));
  const servicesData = Object.entries(services).map(([k, v]) => ({ service: k, count: v }));
  const busyData = Object.entries(busyHours).map(([k, v]) => ({ hour: k, count: v }));

  const COLORS = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

  return (
    <div className="p-6 space-y-6 mt-40">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
        <div className="flex items-center gap-3">
          <label className="text-sm">Month</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={fetchAll}
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
          >
            Refresh
          </button>
        </div>
      </header>

      {loading && <div className="text-sm text-gray-600">Loading...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Daily Paid Reservations">
          {dailyData.length === 0 ? (
            <Empty />
          ) : (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card title="Busy Hours">
          {busyData.length === 0 ? (
            <Empty />
          ) : (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={busyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card title="Barber Performance (count & revenue)">
          {barbersData.length === 0 ? (
            <Empty />
          ) : (
            <div className="space-y-4">
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={barbersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="barber" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" name="Count" fill="#3B82F6"/>
                    <Bar yAxisId="right" dataKey="totalRevenue" name="Revenue" fill="#F59E0B"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Barber</th>
                    <th className="py-2">Count</th>
                    <th className="py-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {barbersData.map((b) => (
                    <tr key={b.barber} className="border-b">
                      <td className="py-2">{b.barber}</td>
                      <td className="py-2">{b.count}</td>
                      <td className="py-2">{b.totalRevenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card title="Services Popularity">
          {servicesData.length === 0 ? (
            <Empty />
          ) : (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={servicesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card title="Customers (new vs recurring)">
          {!customers ? (
            <Empty />
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div style={{ width: 260, height: 260 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={[{ name: "new", value: customers.new_customers }, { name: "recurring", value: customers.recurring_customers }]}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      <Cell fill={COLORS[0]} />
                      <Cell fill={COLORS[1]} />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <div>Total: <strong>{customers.total_customers}</strong></div>
                <div>New: <strong>{customers.new_customers}</strong></div>
                <div>Recurring: <strong>{customers.recurring_customers}</strong></div>
                <div>Recurring rate: <strong>{(customers.recurring_rate * 100).toFixed(1)}%</strong></div>
              </div>
            </div>
          )}
        </Card>

        <Card title="Recurring Gap Distribution">
          {!recurringGap ? (
            <Empty />
          ) : (
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div style={{ width: 420, height: 300 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={Object.entries(recurringGap.distribution).map(([k, v]) => ({
                      bucket: k,
                      count: v,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bucket" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count">
                      {Object.entries(recurringGap.distribution).map(([k, v], i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <div>
                  Total gaps: <strong>{recurringGap.total_recurring_gaps}</strong>
                </div>
                <div className="mt-2">
                  {Object.entries(recurringGap.distribution).map(([k, v], i) => (
                    <div key={k} className="flex items-center gap-2 py-1">
                      <span
                        className="inline-block w-3 h-3"
                        style={{ background: COLORS[i % COLORS.length] }}
                      />
                      <span className="text-sm">
                        {k}: <strong>{v}</strong>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Empty() {
  return <div className="text-sm text-gray-500">No data</div>;
}
