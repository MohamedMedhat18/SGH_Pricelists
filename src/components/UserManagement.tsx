import { useState } from "react";
import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Shield,
  User,
  Mail,
  Building2,
  Edit,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLES } from "@/lib/constants";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branches: string[];
  payers: string[];
  lastActive: string;
  status: "active" | "inactive";
}

const sampleUsers: User[] = [
  {
    id: "1",
    name: "Mohammed Elsayed",
    email: "MMMElsayed@sghgroup.net",
    role: "edit",
    branches: ["all"],
    payers: ["all"],
    lastActive: "Just now",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Ahmed",
    email: "SAhmed@sghgroup.net",
    role: "download",
    branches: ["jeddah", "makkah", "madinah"],
    payers: ["all"],
    lastActive: "2 hours ago",
    status: "active",
  },
  {
    id: "3",
    name: "Khalid Al-Hassan",
    email: "KAlhassan@sghgroup.net",
    role: "view-copy",
    branches: ["riyadh"],
    payers: ["bupa", "medgulf", "gig"],
    lastActive: "1 day ago",
    status: "active",
  },
  {
    id: "4",
    name: "Fatima Noor",
    email: "FNoor@sghgroup.net",
    role: "view-only",
    branches: ["dammam"],
    payers: ["all"],
    lastActive: "3 days ago",
    status: "inactive",
  },
];

export function UserManagement() {
    // إضافة مستخدم جديد
    async function handleAddUser(newUser) {
      const { error } = await supabase.from("users").insert([newUser]);
      if (!error) {
        setDialogOpen(false);
        // إعادة جلب المستخدمين
        const { data } = await supabase.from("users").select("*");
        setUsers(data || []);
      }
    }

    // تعديل مستخدم
    async function handleEditUser(id, updatedFields) {
      const { error } = await supabase.from("users").update(updatedFields).eq("id", id);
      if (!error) {
        const { data } = await supabase.from("users").select("*");
        setUsers(data || []);
      }
    }

    // حذف مستخدم
    async function handleDeleteUser(id) {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (!error) {
        const { data } = await supabase.from("users").select("*");
        setUsers(data || []);
      }
    }
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@sghgroup.net",
      role: "edit",
      branches: ["all"],
      payers: ["all"],
      lastActive: new Date().toISOString(),
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  // عمليات آمنة بالكامل داخل الذاكرة
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // إضافة مستخدم جديد
  function handleAddUser(newUser) {
    setUsers((prev) => [
      ...prev,
      {
        ...newUser,
        id: prev.length ? Math.max(...prev.map(u => u.id)) + 1 : 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    setDialogOpen(false);
  }

  // تعديل مستخدم
  function handleEditUser(id, updatedFields) {
    setUsers((prev) => prev.map(u => u.id === id ? { ...u, ...updatedFields, updated_at: new Date().toISOString() } : u));
  }

  // حذف مستخدم
  function handleDeleteUser(id) {
    setUsers((prev) => prev.filter(u => u.id !== id));
  }

  const getRoleBadge = (roleId: string) => {
    const roleConfig: Record<string, { label: string; className: string }> = {
      edit: { label: "Edit", className: "bg-primary/10 text-primary border-primary/20" },
      download: { label: "Download", className: "bg-accent/10 text-accent border-accent/20" },
      "view-copy": { label: "View & Copy", className: "bg-warning/10 text-warning border-warning/20" },
      "view-only": { label: "View Only", className: "bg-muted text-muted-foreground border-border" },
    };
    const config = roleConfig[roleId] || roleConfig["view-only"];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Add a new user with @sghgroup.net email to grant access.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="user@sghgroup.net" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_ROLES.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        <div>
                          <p className="font-medium">{role.name}</p>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                const name = document.getElementById("name").value;
                const email = document.getElementById("email").value;
                const role = document.querySelector("[name='role']")?.value || "view-only";
                handleAddUser({ name, email, role, branches: ["all"], payers: ["all"], status: "active", lastActive: new Date().toISOString() });
              }}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Branches</TableHead>
              <TableHead className="hidden lg:table-cell">Payers</TableHead>
              <TableHead className="hidden sm:table-cell">Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="table-row-hover">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">
                      {user.branches[0] === "all"
                        ? "All branches"
                        : `${user.branches.length} branches`}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-sm">
                    {user.payers[0] === "all" ? "All payers" : `${user.payers.length} payers`}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                  {user.lastActive}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.status === "active" ? "badge-active" : "badge-inactive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Change Permissions
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredUsers.length} of {sampleUsers.length} users
      </div>
    </div>
  );
}
