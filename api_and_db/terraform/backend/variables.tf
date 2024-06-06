variable "common_tags" {
  type        = map(string)
  description = "Common tags applied to all resources"
  default = {
    "name"       = "budgetPlanner"
  }
}

variable "region" {
  type        = string
  description = "The region where the resources will be deployed."
  default     = "eu-west-1"
}

variable "vpc_cidr" {
  type        = string
  description = "The CIDR block for the VPC."
  default     = "10.0.0.0/16"
}

variable "vpc_azs" {
  type        = list(string)
  description = "The availability zones for the VPC."
  default     = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
}

variable "vpc_public_subnets" {
  type        = list(string)
  description = "The public subnets for the VPC."
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "vpc_private_subnets" {
  type        = list(string)
  description = "The private subnets for the VPC."
  default     = ["10.0.11.0/24", "10.0.12.0/24", "10.0.13.0/24"]
}

variable "ec2_public_key" {
  type        = string
  description = "The public key to use for the EC2 instance."
}

variable "naming_prefix" {
  type        = string
  description = "The prefix to use for naming resources."
  default     = "planback"
}


variable "jwt_secret" {
  type        = string
  description = "The secret for JWT"
  sensitive   = true
}
