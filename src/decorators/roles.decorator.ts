import { Reflector } from "@nestjs/core";

export const AccessedRoles = Reflector.createDecorator<string[]>()