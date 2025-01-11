import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";
import { zfd } from "zod-form-data";

const UserSchema = z.object({
  name : z.string().min(1, "Full name is required"),
  gender: z.enum(["male", "female"]),
  phone: validationRules.phone,
  avatarFile: z.union([
    zfd
    .file()
    .refine((file) => file.size < 10000000, {
      message: "File can't be bigger than 10MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg", "image", 'image/svg+xml',].includes(file.type),
      {
        message: "File format must be either jpg, jpeg , svg, or png.",
      }
    ),
    z.string().refine((url) => {
      try {
        const { pathname } = new URL(url);
        const extension = pathname.split('.').pop();
        return ['jpeg', 'jpg', 'png', 'gif', 'svg'].includes(extension?.toLowerCase() ?? '');
      } catch (error) {
        return false;
      }
    }, {
      message: 'String must be a valid image URL (jpeg, png, gif)',
    })
  ]).optional(),
  role: z.enum(["PARENT", "DRIVER", "SCHOOL", "SECURITY"]),
  school_id: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }).optional(),
});

export default UserSchema;