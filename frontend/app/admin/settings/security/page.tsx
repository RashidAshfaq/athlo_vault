"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Save, Shield, Key, Eye, Download } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SecurityConfiguration() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    require2FA: true,
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    passwordMinLength: "8",
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    passwordExpiry: "90",
    enableAuditLogs: true,
    logRetentionDays: "365",
    enableRateLimiting: true,
    maxApiRequests: "1000",
    enableIpWhitelist: false,
    enableGeoBlocking: false,
  })

  const auditLogs = [
    {
      id: "1",
      user: "admin@athlovault.com",
      action: "User Login",
      timestamp: "2024-01-23 10:30:15",
      ip: "192.168.1.100",
    },
    {
      id: "2",
      user: "admin@athlovault.com",
      action: "Settings Updated",
      timestamp: "2024-01-23 10:25:42",
      ip: "192.168.1.100",
    },
    { id: "3", user: "john@example.com", action: "Failed Login", timestamp: "2024-01-23 10:20:18", ip: "203.0.113.45" },
    {
      id: "4",
      user: "admin@athlovault.com",
      action: "User Approved",
      timestamp: "2024-01-23 10:15:33",
      ip: "192.168.1.100",
    },
  ]

  const handleSave = () => {
    console.log("Saving security settings:", settings)
    toast({
      title: "Security Settings Updated",
      description: "Security configuration has been successfully updated",
    })
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-slate-700 text-slate-300 bg-transparent mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Security Configuration</h1>
            <p className="text-slate-400">Manage platform security settings and access controls</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Authentication Settings
              </CardTitle>
              <CardDescription className="text-slate-400">
                Configure user authentication and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Require Two-Factor Authentication</Label>
                  <p className="text-slate-400 text-sm">Require 2FA for all admin users</p>
                </div>
                <Switch
                  checked={settings.require2FA}
                  onCheckedChange={(checked) => setSettings({ ...settings, require2FA: checked })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session-timeout" className="text-slate-300">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="session-timeout"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="max-login-attempts" className="text-slate-300">
                    Max Login Attempts
                  </Label>
                  <Input
                    id="max-login-attempts"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => setSettings({ ...settings, maxLoginAttempts: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Key className="h-5 w-5 mr-2" />
                Password Policies
              </CardTitle>
              <CardDescription className="text-slate-400">Configure password requirements and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password-length" className="text-slate-300">
                    Minimum Password Length
                  </Label>
                  <Input
                    id="password-length"
                    value={settings.passwordMinLength}
                    onChange={(e) => setSettings({ ...settings, passwordMinLength: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="password-expiry" className="text-slate-300">
                    Password Expiry (days)
                  </Label>
                  <Input
                    id="password-expiry"
                    value={settings.passwordExpiry}
                    onChange={(e) => setSettings({ ...settings, passwordExpiry: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Require Special Characters</Label>
                  <Switch
                    checked={settings.requireSpecialChars}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireSpecialChars: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Require Numbers</Label>
                  <Switch
                    checked={settings.requireNumbers}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireNumbers: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Require Uppercase Letters</Label>
                  <Switch
                    checked={settings.requireUppercase}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireUppercase: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Audit & Monitoring
              </CardTitle>
              <CardDescription className="text-slate-400">
                Configure audit logging and monitoring settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Enable Audit Logs</Label>
                  <p className="text-slate-400 text-sm">Log all admin actions and security events</p>
                </div>
                <Switch
                  checked={settings.enableAuditLogs}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableAuditLogs: checked })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="log-retention" className="text-slate-300">
                    Log Retention (days)
                  </Label>
                  <Input
                    id="log-retention"
                    value={settings.logRetentionDays}
                    onChange={(e) => setSettings({ ...settings, logRetentionDays: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="api-requests" className="text-slate-300">
                    Max API Requests/hour
                  </Label>
                  <Input
                    id="api-requests"
                    value={settings.maxApiRequests}
                    onChange={(e) => setSettings({ ...settings, maxApiRequests: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Enable Rate Limiting</Label>
                  <p className="text-slate-400 text-sm">Limit API requests to prevent abuse</p>
                </div>
                <Switch
                  checked={settings.enableRateLimiting}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableRateLimiting: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Access Control</CardTitle>
              <CardDescription className="text-slate-400">
                Configure IP whitelisting and geographic restrictions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Enable IP Whitelist</Label>
                  <p className="text-slate-400 text-sm">Only allow access from approved IP addresses</p>
                </div>
                <Switch
                  checked={settings.enableIpWhitelist}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableIpWhitelist: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Enable Geo-blocking</Label>
                  <p className="text-slate-400 text-sm">Block access from restricted countries</p>
                </div>
                <Switch
                  checked={settings.enableGeoBlocking}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableGeoBlocking: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Recent Audit Logs</CardTitle>
                  <CardDescription className="text-slate-400">Recent security events and admin actions</CardDescription>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-slate-800">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-800">
                      <TableHead className="text-slate-400">User</TableHead>
                      <TableHead className="text-slate-400">Action</TableHead>
                      <TableHead className="text-slate-400">Timestamp</TableHead>
                      <TableHead className="text-slate-400">IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id} className="border-slate-800">
                        <TableCell className="text-white">{log.user}</TableCell>
                        <TableCell className="text-white">{log.action}</TableCell>
                        <TableCell className="text-slate-400">{log.timestamp}</TableCell>
                        <TableCell className="text-slate-400 font-mono">{log.ip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Security Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
