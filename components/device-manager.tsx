{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 'use client'\
\
import \{ useState, useEffect \} from 'react'\
import \{ Button \} from "@/components/ui/button"\
import \{ Input \} from "@/components/ui/input"\
import \{ Card, CardContent, CardHeader, CardTitle \} from "@/components/ui/card"\
import \{ Battery, Bluetooth, Upload \} from 'lucide-react'\
\
export default function DeviceManager() \{\
  const [device, setDevice] = useState<BluetoothDevice | null>(null)\
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null)\
  const [isConnected, setIsConnected] = useState(false)\
  const [selectedFile, setSelectedFile] = useState<File | null>(null)\
\
  const connectToDevice = async () => \{\
    try \{\
      const device = await navigator.bluetooth.requestDevice(\{\
        filters: [\{ name: 'RunnerNavigator' \}],\
        optionalServices: ['battery_service', 'route_service']\
      \})\
      \
      setDevice(device)\
      setIsConnected(true)\
      \
      device.addEventListener('gattserverdisconnected', onDisconnected)\
      \
      const server = await device.gatt?.connect()\
      if (server) \{\
        await readBatteryLevel(server)\
      \}\
    \} catch (error) \{\
      console.error('Connection failed', error)\
    \}\
  \}\
\
  const onDisconnected = () => \{\
    setIsConnected(false)\
    setBatteryLevel(null)\
  \}\
\
  const readBatteryLevel = async (server: BluetoothRemoteGATTServer) => \{\
    const batteryService = await server.getPrimaryService('battery_service')\
    const characteristic = await batteryService.getCharacteristic('battery_level')\
    const value = await characteristic.readValue()\
    setBatteryLevel(value.getUint8(0))\
  \}\
\
  const uploadRoute = async () => \{\
    if (!device || !selectedFile) return\
\
    try \{\
      const server = await device.gatt?.connect()\
      if (!server) throw new Error('No GATT server')\
\
      const service = await server.getPrimaryService('route_service')\
      const characteristic = await service.getCharacteristic('route_data')\
\
      const reader = new FileReader()\
      reader.onload = async (e) => \{\
        const arrayBuffer = e.target?.result as ArrayBuffer\
        await characteristic.writeValue(arrayBuffer)\
        alert('Route uploaded successfully!')\
      \}\
      reader.readAsArrayBuffer(selectedFile)\
    \} catch (error) \{\
      console.error('Upload failed', error)\
      alert('Failed to upload route')\
    \}\
  \}\
\
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => \{\
    const file = event.target.files?.[0]\
    if (file) \{\
      setSelectedFile(file)\
    \}\
  \}\
\
  useEffect(() => \{\
    return () => \{\
      if (device) \{\
        device.removeEventListener('gattserverdisconnected', onDisconnected)\
      \}\
    \}\
  \}, [device])\
\
  return (\
    <div className="container mx-auto p-4">\
      <Card>\
        <CardHeader>\
          <CardTitle>Runner Navigation Device Manager</CardTitle>\
        </CardHeader>\
        <CardContent>\
          <div className="space-y-4">\
            <Button onClick=\{connectToDevice\} disabled=\{isConnected\}>\
              <Bluetooth className="mr-2 h-4 w-4" />\
              \{isConnected ? 'Connected' : 'Connect to Device'\}\
            </Button>\
            \
            \{isConnected && (\
              <>\
                <div className="flex items-center space-x-2">\
                  <Battery className="h-6 w-6" />\
                  <span>Battery Level: \{batteryLevel !== null ? `$\{batteryLevel\}%` : 'Unknown'\}</span>\
                </div>\
                \
                <div className="space-y-2">\
                  <Input type="file" accept=".gpx" onChange=\{handleFileChange\} />\
                  <Button onClick=\{uploadRoute\} disabled=\{!selectedFile\}>\
                    <Upload className="mr-2 h-4 w-4" />\
                    Upload Route\
                  </Button>\
                </div>\
              </>\
            )\}\
          </div>\
        </CardContent>\
      </Card>\
    </div>\
  )\
\}}